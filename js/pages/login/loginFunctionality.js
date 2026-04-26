import { loginUpdate } from "../../components/layout.js";
import { t } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { API, hashPassword } from "../../services/services.js";
import { setLogin } from "../../utils/storage.js";

export function initLoginPage() {
    const nicknameInput = document.querySelector('.nickname-input');
    const passwordInput = document.querySelector('.password-input');

    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');

    const forgotButton = document.querySelector('.forgot-password');

    if (!nicknameInput || !passwordInput || !loginButton || !registerButton) return;

    const handleLogin = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error("помилка мережі");
            const users = await response.json();

            const passwordHash = await hashPassword(passwordInput.value);
            const user = users.find(u =>
                u.nickname === nicknameInput.value && u.password === passwordHash
            );

            if (user) {
                setLogin(nicknameInput.value, passwordHash, true);
                navigate('/');
                loginUpdate();
            } else {
                alert(t('loginError'));
            }

        } catch (error) {
            console.error(error);
            alert(t('serverError'));
        }
    };

    const handleRegister = async () => {
        try {
            const nickname = nicknameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!nickname || !password) {
                alert(t('emptyFields'));
                return;
            }

            const usersResponse = await fetch(API);

            if (!usersResponse.ok) throw new Error('помилка мережі');

            const users = await usersResponse.json();

            const nicknameExists = users.some(
                u => u.nickname.toLowerCase() === nickname.toLowerCase()
            );

            if (nicknameExists) {
                alert(t('nicknameExists'));
                return;
            }

            const passwordHash = await hashPassword(password);

            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nickname,
                    password: passwordHash,
                    projects: []
                })
            });

            if (response.ok) {
                const createdUser = await response.json();
                setLogin(nickname, passwordHash, true);
                navigate('/');
                loginUpdate();
            } else {
                alert(t('registerError'));
            }

        } catch (error) {
            console.error(error);
            alert(t('serverError'));
        }
    };

    function forgotPassword(){
        alert(t('forgotPasswordFunc'));
    }

    loginButton.addEventListener('click', handleLogin);
    registerButton.addEventListener('click', handleRegister);
    forgotButton.addEventListener('click', forgotPassword);

    return () => {
        loginButton.removeEventListener('click', handleLogin);
        registerButton.removeEventListener('click', handleRegister);
        forgotButton.removeEventListener('click', forgotPassword);
    };
}