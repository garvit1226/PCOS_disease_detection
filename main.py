from pathlib import Path
import joblib, numpy as np
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

BASE=Path(__file__).resolve().parent
app=FastAPI(title='PCOS Disease Detection')
app.mount('/static', StaticFiles(directory=BASE/'static'), name='static')
templates = Jinja2Templates(directory=str(BASE / "templates"))
MODEL_PATH=BASE/'models/pcos_random_forest.pkl'
SCALER_PATH=BASE/'models/pcos_scaler.pkl'
FEATURES=['Age (yrs)','BMI','Pulse rate(bpm)','RR (breaths/min)','Hb(g/dl)','Cycle(R/I)','Cycle length(days)','Marraige Status (Yrs)','Pregnant(Y/N)','No. of abortions','I   beta-HCG(mIU/mL)','II    beta-HCG(mIU/mL)','FSH/LH','Waist:Hip Ratio','TSH (mIU/L)','AMH(ng/mL)','PRL(ng/mL)','Vit D3 (ng/mL)','PRG(ng/mL)','RBS(mg/dl)','Weight gain(Y/N)','hair growth(Y/N)','Skin darkening (Y/N)','Hair loss(Y/N)','Pimples(Y/N)','Fast food (Y/N)','Reg.Exercise(Y/N)','BP _Systolic (mmHg)','BP _Diastolic (mmHg)','Follicle No. (L)','Follicle No. (R)','Avg. F size (L) (mm)','Avg. F size (R) (mm)','Endometrium (mm)']

def load_assets():
    if MODEL_PATH.exists() and SCALER_PATH.exists():
        return joblib.load(MODEL_PATH), joblib.load(SCALER_PATH)
    return None, None

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"features": FEATURES}
    )

@app.get('/api/health')
def health():
    model,scaler=load_assets(); return {'status':'ok','model_loaded':model is not None,'features':len(FEATURES)}

@app.post('/api/predict')
async def predict(request: Request):
    payload=await request.json(); model,scaler=load_assets()
    if model is None: return JSONResponse({'error':'Model files not found. Put pcos_random_forest.pkl and pcos_scaler.pkl in models/.'},status_code=503)
    try:
        vals=[]
        for f in FEATURES:
            v=payload.get(f)
            if v is None or str(v).strip()=='': raise ValueError(f'Missing value: {f}')
            vals.append(float(v))
        X=np.array(vals,dtype=float).reshape(1,-1)
        pred=int(model.predict(scaler.transform(X))[0])
        prob=float(model.predict_proba(scaler.transform(X))[0][1]) if hasattr(model,'predict_proba') else None
        return {'prediction':pred,'label':'PCOS Detected' if pred==1 else 'PCOS Not Detected','probability':prob}
    except Exception as e: return JSONResponse({'error':str(e)},status_code=400)
