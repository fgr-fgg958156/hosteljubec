import { loginUpdate } from "../../components/layout.js";
import { t } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { loginUser, registerUser, getUsers } from "../../services/services.js";

export function initLoginPage() {
    const nicknameInput = document.querySelector('.nickname-input');
    const passwordInput = document.querySelector('.password-input');

    const loginButton = document.querySelector('.login-button');
    const registerButton = document.querySelector('.register-button');
    const forgotButton = document.querySelector('.forgot-password');

    if (!nicknameInput || !passwordInput || !loginButton || !registerButton) return;

    const handleLogin = async () => {
        try {
            const nickname = nicknameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!nickname || !password) {
                alert(t('emptyFields'));
                return;
            }

            await loginUser(nickname, password);

            await loginUpdate(true);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(t('loginError'));
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

            const users = await getUsers();

            const nicknameExists = users.some(
                u => u.nickname.toLowerCase() === nickname.toLowerCase()
            );

            if (nicknameExists) {
                alert(t('nicknameExists'));
                return;
            }

            await registerUser(nickname, password);
            await loginUpdate(true);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(t('registerError'));
        }
    };

    function forgotPassword() {
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