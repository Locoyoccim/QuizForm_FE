import { useTranslation } from "react-i18next";
import { inputProps } from "../../interfaces/indexInterface";

function OptionInput({ options = [], onChange }: inputProps) {
    const { t } = useTranslation();

    return (
        <select
            className="form-select text-capitalize"
            onChange={(e) => onChange(e.target.value)}
        >
            <option>{t('select option')}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default OptionInput;
