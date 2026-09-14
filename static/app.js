const features = [
    'Age (yrs)',
    'BMI',
    'Pulse rate(bpm)',
    'RR (breaths/min)',
    'Hb(g/dl)',
    'Cycle(R/I)',
    'Cycle length(days)',
    'Marraige Status (Yrs)',
    'Pregnant(Y/N)',
    'No. of abortions',
    'I   beta-HCG(mIU/mL)',
    'II    beta-HCG(mIU/mL)',
    'FSH/LH',
    'Waist:Hip Ratio',
    'TSH (mIU/L)',
    'AMH(ng/mL)',
    'PRL(ng/mL)',
    'Vit D3 (ng/mL)',
    'PRG(ng/mL)',
    'RBS(mg/dl)',
    'Weight gain(Y/N)',
    'hair growth(Y/N)',
    'Skin darkening (Y/N)',
    'Hair loss(Y/N)',
    'Pimples(Y/N)',
    'Fast food (Y/N)',
    'Reg.Exercise(Y/N)',
    'BP _Systolic (mmHg)',
    'BP _Diastolic (mmHg)',
    'Follicle No. (L)',
    'Follicle No. (R)',
    'Avg. F size (L) (mm)',
    'Avg. F size (R) (mm)',
    'Endometrium (mm)'
];




const categoricalOptions = {

    // Dataset values: 0 = No, 1 = Yes
    'Pregnant(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Weight gain(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'hair growth(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Skin darkening (Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Hair loss(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Pimples(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Fast food (Y/N)': {
        'No': 0,
        'Yes': 1
    },

    'Reg.Exercise(Y/N)': {
        'No': 0,
        'Yes': 1
    },

    // Keep original dataset encoding
    'Cycle(R/I)': {
        'Regular cycle': 4,
        'Irregular cycle': 2,
        'Other/rare category': 5
    }
};




const labels = {

    'Age (yrs)': 'Age (years)',

    'BMI': 'BMI',

    'Pulse rate(bpm)': 'Pulse rate (bpm)',

    'RR (breaths/min)': 'Respiratory rate (breaths/min)',

    'Hb(g/dl)': 'Hemoglobin (g/dl)',

    'Cycle(R/I)': 'Menstrual Cycle Regularity',

    'Cycle length(days)': 'Cycle length (days)',

    'Marraige Status (Yrs)': 'Marriage status (years)',

    'Pregnant(Y/N)': 'Pregnant (Y/N)',

    'No. of abortions': 'Number of abortions',

    'I   beta-HCG(mIU/mL)': 'I beta-HCG (mIU/mL)',

    'II    beta-HCG(mIU/mL)': 'II beta-HCG (mIU/mL)',

    'FSH/LH': 'FSH/LH',

    'Waist:Hip Ratio': 'Waist:Hip ratio',

    'TSH (mIU/L)': 'TSH (mIU/L)',

    'AMH(ng/mL)': 'AMH (ng/mL)',

    'PRL(ng/mL)': 'PRL (ng/mL)',

    'Vit D3 (ng/mL)': 'Vitamin D3 (ng/mL)',

    'PRG(ng/mL)': 'PRG (ng/mL)',

    'RBS(mg/dl)': 'RBS (mg/dl)',

    'Weight gain(Y/N)': 'Weight gain (Y/N)',

    'hair growth(Y/N)': 'Hair growth (Y/N)',

    'Skin darkening (Y/N)': 'Skin darkening (Y/N)',

    'Hair loss(Y/N)': 'Hair loss (Y/N)',

    'Pimples(Y/N)': 'Pimples (Y/N)',

    'Fast food (Y/N)': 'Fast food (Y/N)',

    'Reg.Exercise(Y/N)': 'Regular exercise (Y/N)',

    'BP _Systolic (mmHg)': 'BP systolic (mmHg)',

    'BP _Diastolic (mmHg)': 'BP diastolic (mmHg)',

    'Follicle No. (L)': 'Follicle number (Left)',

    'Follicle No. (R)': 'Follicle number (Right)',

    'Avg. F size (L) (mm)': 'Average follicle size (Left) (mm)',

    'Avg. F size (R) (mm)': 'Average follicle size (Right) (mm)',

    'Endometrium (mm)': 'Endometrium (mm)'
};





const fieldsContainer = document.getElementById('fields');

features.forEach((feature, index) => {

    const wrapper = document.createElement('div');

    wrapper.className = 'field';



    const label = document.createElement('label');

    label.textContent = labels[feature] || feature;

    label.htmlFor = `field-${index}`;


    let control;


    // -----------------------------------------------------
    // DROPDOWN FOR CATEGORICAL FEATURES
    // -----------------------------------------------------

    if (categoricalOptions[feature]) {

    control = document.createElement('select');

    control.required = true;

    const placeholder = document.createElement('option');

    placeholder.value = '';

    placeholder.textContent = 'Select';

    placeholder.disabled = true;

    placeholder.selected = true;

    control.appendChild(placeholder);


    Object.entries(categoricalOptions[feature]).forEach(
        ([label, encodedValue]) => {

            const option = document.createElement('option');

            // IMPORTANT:
            // The visible text is Yes/No,
            // but the value sent to the backend is 0/1.

            option.value = encodedValue;

            option.textContent = label;

            control.appendChild(option);
        }
    );
}


    // -----------------------------------------------------
    // NUMBER INPUT FOR NUMERICAL FEATURES
    // -----------------------------------------------------

    else {

        control = document.createElement('input');

        control.type = 'number';

        control.step = 'any';

        control.required = true;

        control.placeholder = 'Enter value';

    }


    control.id = `field-${index}`;

    control.name = feature;


    wrapper.appendChild(label);

    wrapper.appendChild(control);

    fieldsContainer.appendChild(wrapper);

});


// ---------------------------------------------------------
// ELEMENTS
// ---------------------------------------------------------

const form = document.getElementById('pcosForm');

const button = document.getElementById('predictBtn');

const resultCard = document.getElementById('resultCard');

const resultBadge = document.getElementById('resultBadge');

const resultIcon = document.getElementById('resultIcon');

const resultTitle = document.getElementById('resultTitle');

const resultText = document.getElementById('resultText');

const probability = document.getElementById('probability');

const probabilityBar = document.getElementById('probabilityBar');


// ---------------------------------------------------------
// FORM SUBMISSION
// ---------------------------------------------------------

form.addEventListener('submit', async (event) => {

    event.preventDefault();


    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());


    // -----------------------------------------------------
    // CONVERT ALL VALUES TO NUMBERS
    // -----------------------------------------------------

    for (const feature of features) {

        if (
            data[feature] === undefined ||
            data[feature].trim() === ''
        ) {

            alert(`Please enter ${labels[feature] || feature}`);

            return;

        }

        data[feature] = Number(data[feature]);

    }


    // -----------------------------------------------------
    // BUTTON LOADING STATE
    // -----------------------------------------------------

    button.disabled = true;

    button.querySelector('span:first-child').textContent =
        'Generating prediction...';


    // -----------------------------------------------------
    // SHOW RESULT CARD
    // -----------------------------------------------------

    resultCard.classList.remove('hidden');


    resultBadge.textContent = 'Analyzing';

    resultBadge.style.background = '#eef3f6';

    resultBadge.style.color = '#5f7483';


    resultIcon.textContent = '…';

    resultIcon.style.background = '#eaf5ff';

    resultIcon.style.color = '#1769aa';


    resultTitle.textContent = 'Analyzing';

    resultText.textContent =
        'Running the trained Random Forest model.';


    probability.textContent = '—';

    probabilityBar.style.width = '0%';


    // -----------------------------------------------------
    // SEND DATA TO FASTAPI
    // -----------------------------------------------------

    try {

        const response = await fetch('/api/predict', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)

        });


        const result = await response.json();


        // -------------------------------------------------
        // HANDLE API ERROR
        // -------------------------------------------------

        if (!response.ok) {

            throw new Error(
                result.error || 'Prediction failed.'
            );

        }


        // -------------------------------------------------
        // PREDICTION
        // -------------------------------------------------

        const detected =
            Number(result.prediction) === 1;


        let percent = null;

        if (result.probability !== null &&
            result.probability !== undefined) {

            percent = Number(result.probability) * 100;

        }


        // -------------------------------------------------
        // RESULT BADGE
        // -------------------------------------------------

        resultBadge.textContent =
            result.label ||
            (detected
                ? 'PCOS Detected'
                : 'PCOS Not Detected');


        if (detected) {

            resultBadge.style.background = '#fff0f0';

            resultBadge.style.color = '#b44e4e';

        } else {

            resultBadge.style.background = '#e9f8f2';

            resultBadge.style.color = '#0e7659';

        }


        // -------------------------------------------------
        // RESULT ICON
        // -------------------------------------------------

        if (detected) {

            resultIcon.textContent = '!';

            resultIcon.style.background = '#fff0f0';

            resultIcon.style.color = '#c55a5a';

        } else {

            resultIcon.textContent = '✓';

            resultIcon.style.background = '#e9f8f2';

            resultIcon.style.color = '#159570';

        }


        // -------------------------------------------------
        // RESULT TITLE
        // -------------------------------------------------

        resultTitle.textContent =
            result.label ||
            (detected
                ? 'PCOS Detected'
                : 'PCOS Not Detected');


        // -------------------------------------------------
        // RESULT DESCRIPTION
        // -------------------------------------------------

        if (detected) {

            resultText.textContent =
                'The model classified this assessment as positive for PCOS.';

        } else {

            resultText.textContent =
                'The model classified this assessment as negative for PCOS.';

        }


        // -------------------------------------------------
        // PROBABILITY
        // -------------------------------------------------

        if (percent !== null) {

            const safePercent =
                Math.max(
                    0,
                    Math.min(100, percent)
                );


            probability.textContent =
                `${safePercent.toFixed(1)}%`;


            probabilityBar.style.width =
                `${safePercent}%`;

        } else {

            probability.textContent = '—';

            probabilityBar.style.width = '0%';

        }

    }


    // -----------------------------------------------------
    // ERROR HANDLING
    // -----------------------------------------------------

    catch (error) {

        resultBadge.textContent = 'Error';

        resultBadge.style.background = '#fff0f0';

        resultBadge.style.color = '#b44e4e';


        resultIcon.textContent = '!';

        resultIcon.style.background = '#fff0f0';

        resultIcon.style.color = '#c55a5a';


        resultTitle.textContent =
            'Unable to predict';


        resultText.textContent =
            error.message;


        probability.textContent = '—';

        probabilityBar.style.width = '0%';

    }


    // -----------------------------------------------------
    // RESTORE BUTTON
    // -----------------------------------------------------

    finally {

        button.disabled = false;

        button.querySelector('span:first-child').textContent =
            'Generate Screening Prediction';

    }

});