export function initCheckboxFunctionality(checkbox, stateKey, getSettings, setSettings, onChange) {
    checkbox.addEventListener('change', (e) => {
        const value = e.target.checked;

        const settings = getSettings();

        const newSettings = {
            ...settings,
            [stateKey]: value
        };

        setSettings(newSettings);

        onChange?.(value);
    });
}