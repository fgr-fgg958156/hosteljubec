import { loginUpdate } from "../../components/layout.js";
import { t } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { API, getCurrentUser, hashPassword, updateUser } from "../../services/services.js";
import { dataLogin, setLogin } from "../../utils/storage.js";
import { clearUsersCache } from "../dashboard/dashboardFunctionality.js";

export function initAccountPage(){
    const nicknameInput = document.querySelector('.nickname-edit-input');
    const passwordInput = document.querySelector('.password-edit-input');
    
    const deleteButton = document.querySelector('.delete-profile-button');
    const logoutButton = document.querySelector('.logout-profile-button');
    const saveButton = document.querySelector('.save-profile-button');

    if (!nicknameInput || !passwordInput || !deleteButton || !saveButton) return;
    updateUserProfile();
    checkSpecialDate();

    function checkSpecialDate() {
        const dates = [
            { day: 5, month: 2 },
            { day: 28, month: 2 },
            { day: 22, month: 4 }
        ];

        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth() + 1;

        const isSpecialDate = dates.some(date =>
            date.day === day &&
            date.month === month
        );

        if (isSpecialDate) {
            const partyHat = document.querySelector('.party-hat');
            partyHat.style.display = 'block';
            const rect = nicknameInput.getBoundingClientRect();
            confetti({position: {x: rect.left + rect.width / 2,y: rect.top + rect.height / 2}});
        }
    }

    const saveNewData = async () => {
        try {
            const nickname = nicknameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!nickname) {
                alert(t('emptyFields'));
                return;
            }

            const data = dataLogin();
            if (Object.keys(data).length === 0) return;

            const user = await getCurrentUser();

            if (!user) {
                alert(t('userNotFound'));
                return;
            }

            const passwordHash = password ? await hashPassword(password) : data.password;
            await updateUser(user, ['nickname', 'password'], [nickname, passwordHash]);

            setLogin(nickname, passwordHash, true);
            updateUserProfile();
        } catch (error) {
            console.error(error);
            alert(t('updateError'));
        }
    };

    const deleteAccount = async () => {
        try {
            const data = dataLogin();
            if (Object.keys(data).length === 0) return;

            const user = await getCurrentUser();

            const response = await fetch(`${API}/${user.id}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) throw new Error();
            setLogin("", "", false);
            navigate('/');
            loginUpdate();
            clearUsersCache();
        }
        catch (error) {
            console.error(error);
            alert(t('deleteError'));
        }
    }

    function logout(){
        setLogin("", "", false);
        navigate('/');
        loginUpdate();
        clearUsersCache();
    }

    async function loadData(){
        const data = dataLogin();
        if (Object.keys(data).length === 0) return;
        nicknameInput.value = data.nickname;
    }

    loadData();

    deleteButton.addEventListener('click', deleteAccount);
    saveButton.addEventListener('click', saveNewData);
    logoutButton.addEventListener('click', logout);

    return () => {
        deleteButton.removeEventListener('click', deleteAccount);
        saveButton.removeEventListener('click', saveNewData);
        logoutButton.removeEventListener('click', logout);
    }
}

export function updateUserProfile(){
    const profile = document.querySelector(".user-profile-image");
    if(!profile) return;
    profile.innerHTML = dataLogin()?.nickname?.[0]?.toUpperCase() || ''
}