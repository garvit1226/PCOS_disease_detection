# PCOS Disease Detection Website

FastAPI + HTML/CSS/JS interface based on the supplied PCOS notebook.

## Folder structure
- `main.py` — FastAPI backend (root as requested)
- `templates/index.html` — bright dashboard UI
- `static/style.css`, `static/app.js` — frontend
- `models/` — **put `pcos_random_forest.pkl` and `pcos_scaler.pkl` here**
- `dataset/` — **put `PCOS_extended_dataset.csv` here**

## Run
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
Open `http://127.0.0.1:8000`.

The notebook trained a Random Forest using StandardScaler and 34 input features after dropping `Sl. No`, `Patient File No.`, `Weight (Kg)`, `Height(Cm)`, `Blood Group`, `FSH(mIU/mL)`, `LH(mIU/mL)`, `Waist(inch)`, and `Hip(inch)`. The website keeps the model and dataset folders empty so the trained `.pkl` files and CSV can be added later.

> Educational/research screening interface; not a medical diagnosis.

#Live Demo
https://pcos-disease-detection.onrender.com/

