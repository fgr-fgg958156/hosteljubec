import { whiteLoaderIcon } from "../../../assets/icons.js";
import { loginUpdate } from "../../components/layout.js";
import { t } from "../../language/languageController.js";
import { navigate } from "../../router/router.js";
import { getCurrentUser, updateUser, deleteCurrentUser, logoutUser, updatePassword, getCurrentEmail } from "../../services/services.js";
import { mainContainer } from "../../utils/loader.js";
import { dataSettings, setSettings } from "../../utils/storage.js";
import { clearUsersCache } from "../dashboard/dashboardFunctionality.js";
import { initCheckboxFunctionality } from "../home/checkboxFunctionality.js";

export async function initAccountPage() {
    const nicknameInput = document.querySelector('.nickname-edit-input');
    const passwordInput = document.querySelector('.password-edit-input');
    const cooldownInput = document.querySelector('.cooldown-edit-input');

    const deleteButton = document.querySelector('.delete-profile-button');
    const logoutButton = document.querySelector('.logout-profile-button');
    const saveButton = document.querySelector('.save-profile-button');

    const randomSwitch = document.querySelector('#isRandom');
    const inputSwitch = document.querySelector('#keyboard');
    const learningSwitch = document.querySelector('#learningMode');
    const testSwitch = document.querySelector('#testMode');
    const foldersSwitch = document.querySelector('#foldersMode');
    
    const settings = dataSettings();

    let isRandom = settings.isRandom ?? false;
    let showInput = settings.showInput ?? false;
    let learningMode = settings.learningMode ?? false;
    let testMode = settings.testMode ?? false;
    let foldersMode = settings.foldersMode ?? false;

    randomSwitch.checked = isRandom;
    inputSwitch.checked = showInput;
    learningSwitch.checked = learningMode;
    testSwitch.checked = testMode;
    foldersSwitch.checked = foldersMode;
    cooldownInput.value = settings.cooldown || 2000;

    if (!nicknameInput || !passwordInput || !deleteButton || !saveButton) return;
    
    const user = await getCurrentUser();
    const email = await getCurrentEmail();

    if(!user || !email) navigate('/');

    await updateUserProfile(user, email);
    checkSpecialDate();

    initCheckboxFunctionality(randomSwitch, "isRandom", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), null);
    initCheckboxFunctionality(inputSwitch, "showInput", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), null);
    initCheckboxFunctionality(learningSwitch, "learningMode", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), null);
    initCheckboxFunctionality(testSwitch, "testMode", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), null);
    initCheckboxFunctionality(foldersSwitch, "foldersMode", dataSettings, (settings) => localStorage.setItem("dataSettings", JSON.stringify(settings)), null);

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

            const rect = mainContainer.getBoundingClientRect();

            confetti({
                position: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                }
            });
        }
    }

    function saveCoolDown(){
        const settingsData = dataSettings();
        setSettings({...settingsData, cooldown: +cooldownInput.value});
    }

    cooldownInput.addEventListener('input', () => saveCoolDown());

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

            const newUser = await getCurrentUser();
            await updateUserProfile(newUser, email);
            clearUsersCache();
        } catch (error) {
            console.error(error);
            alert(t('updateError'));
        }
    };

    const deleteAccount = async () => {
        try {
            if (!user) return;

            const confirmed = window.confirm(t('confirmMessage'));
            if (!confirmed) return;

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
        cooldownInput.removeEventListener('input', () => saveCoolDown());
    };
}

export async function updateUserProfile(user, email) {
    const profile = document.querySelector(".user-profile-image");
    const profileName = document.querySelector(".header-nickname");
    const nicknameInput = document.querySelector('.nickname-edit-input');
    const registerName = document.querySelector('.register-name');

    if (!profile || !profileName || !nicknameInput || !registerName) return;

    if (!user) {
        profile.innerHTML = `${whiteLoaderIcon}`;
        profileName.textContent = `...`;
        nicknameInput.value = '';
        registerName.textContent = '@...'
        return;
    }

    profile.innerHTML = user.nickname?.[0]?.toUpperCase() || `${whiteLoaderIcon}`;
    profileName.textContent = user.nickname || '...';
    nicknameInput.value = user.nickname || '';
    registerName.textContent = email;
}