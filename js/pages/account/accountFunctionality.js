import { loaderIcon } from "../../../assets/icons.js";
import { loginUpdate } from "../../components/layout.js";
import { t } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { getCurrentUser, updateUser, deleteCurrentUser, logoutUser, updatePassword, getCurrentEmail } from "../../services/services.js";
import { clearUsersCache } from "../dashboard/dashboardFunctionality.js";

export async function initAccountPage() {
    const user = await getCurrentUser();
    const email = await getCurrentEmail();
    const nicknameInput = document.querySelector('.nickname-edit-input');
    const passwordInput = document.querySelector('.password-edit-input');

    const deleteButton = document.querySelector('.delete-profile-button');
    const logoutButton = document.querySelector('.logout-profile-button');
    const saveButton = document.querySelector('.save-profile-button');

    if (!nicknameInput || !passwordInput || !deleteButton || !saveButton) return;

    await updateUserProfile(user, email);
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

        const isSpecialDate = dates.some(d =>
            d.day === day && d.month === month
        );

        if (isSpecialDate) {
            const partyHat = document.querySelector('.party-hat');
            if (partyHat) partyHat.style.display = 'block';

            const rect = nicknameInput.getBoundingClientRect();

            confetti({
                position: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                }
            });
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

            if (!user) {
                alert(t('userNotFound'));
                return;
            }

            await updateUser(user, ['nickname'], [nickname]);

            if (password) {
                await updatePassword(password);
            }

            await updateUserProfile(user, email);
            clearUsersCache();

        } catch (error) {
            console.error(error);
            alert(t('updateError'));
        }
    };

    const deleteAccount = async () => {
        try {
            if (!user) return;

            await deleteCurrentUser();

            navigate('/');
            loginUpdate(false);
            clearUsersCache();

        } catch (error) {
            console.error(error);
            alert(t('deleteError'));
        }
    };

    async function logout() {
        await logoutUser();

        navigate('/');
        loginUpdate(false);
        clearUsersCache();
    }

    deleteButton.addEventListener('click', deleteAccount);
    saveButton.addEventListener('click', saveNewData);
    logoutButton.addEventListener('click', logout);

    return () => {
        deleteButton.removeEventListener('click', deleteAccount);
        saveButton.removeEventListener('click', saveNewData);
        logoutButton.removeEventListener('click', logout);
    };
}

export async function updateUserProfile(user, email) {
    const profile = document.querySelector(".user-profile-image");
    const profileName = document.querySelector(".header-nickname");
    const nicknameInput = document.querySelector('.nickname-edit-input');
    const registerName = document.querySelector('.register-name');

    if (!profile || !profileName || !nicknameInput || !registerName) return;

    if (!user) {
        profile.innerHTML = `${loaderIcon}`;
        profileName.textContent = `...`;
        nicknameInput.value = '';
        registerName.textContent = '@...'
        return;
    }

    profile.innerHTML = user.nickname?.[0]?.toUpperCase() || `${loaderIcon}`;
    profileName.textContent = user.nickname || '...';
    nicknameInput.value = user.nickname || '';
    registerName.textContent = email;
}