import { t } from "../../language/languageController.js";
import { getCurrentUser, supabase, updateUser } from "../../services/services.js";
import { dataSettings, setSettings } from "../../utils/storage.js";

let handler = null;

export function initFileLoader(onLoad) {
    const fileArray = document.querySelector('#fileInput');
    if (!fileArray) return;

    if (handler) {
        fileArray.removeEventListener('change', handler);
    }

    handler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            alert(t('invalidData'));
            return;
        }

        if (!data.words1 || !data.words2) {
            alert(t('wrongStructure'));
            return;
        }

        if (data.words1.length !== data.words2.length) {
            alert(t('differentLength'));
            return;
        }

        const normalized = {
            fileName: data.fileName || t('unnamed'),
            image: data.words2,
            preimage: data.words1,
            addition: data.words3 || [],
            tags: data.tags || []
        };

        localStorage.setItem('dataWords', JSON.stringify(normalized));

        const settingsData = dataSettings();
        setSettings(
            settingsData.isRandom,
            0,
            settingsData.isDark,
            settingsData.showInput
        );

        onLoad?.(normalized);

        e.target.value = '';

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const currentUser = await getCurrentUser();
        if (!currentUser) {
            alert(t('userNotFound'));
            return;
        }

        const projects = currentUser.projects || [];

        const updatedProjects = [
            ...projects.filter(p => p.fileName !== normalized.fileName),
            {
                fileName: normalized.fileName,
                isPublic: false,
                tags: normalized.tags,
                cards: {
                    image: normalized.image,
                    preimage: normalized.preimage,
                    addition: normalized.addition
                }
            }
        ];

        await updateUser(currentUser, ['projects'], [updatedProjects]);
    };

    fileArray.addEventListener('change', handler);
}