const supabaseUrl = 'https://ayriinfhhziwoxlgwpem.supabase.co'
const supabaseKey = 'sb_publishable_BDCOwMVcpeDIr7FbHp7rUA_kvtMFX8N'

const _supabase = supabase.createClient(supabaseUrl, supabaseKey)
let yangiSoz = document.getElementById('yangi-soz')
let talafuz = document.getElementById('talafuz')
let tarjima = document.getElementById('tarjima')

async function Yubor() {

    const { data, error } = await _supabase
        .from('Sozlar')
        .insert([
            {
                YangiSoz: yangiSoz.value,
                Talafuz: talafuz.value,
                Tarjima: tarjima.value
            }
        ])
    if (error) {
        alert('Xatolik yuz berdi!', error.message)
    }
    else {
        alert("Bazaga qo'shildi")
        tozala()
    }   
}
async function Olish() {
    const { data, error } = await _supabase
        .from('Sozlar')
        .select('*')
    if (error) {
        alert('Xatolik yuz berdi!', error.message)
    } 
    else {
        console.log(data);
        let html = ''
        data.forEach(qator => {
            let cardCon = document.getElementById('card-con')
            html += `
                <div class="sec2-card">
                    <div class="sec2-card-title">
                        <p>BUGUN</p>
                        <i id="ovoz" onclick="Gapir()" class="fa-solid fa-volume-high"></i>
                    </div>
                    <div class="sec2-card-main">
                        <h1 id="yangi-soz">${qator.YangiSoz}</h1>
                        <p>[${qator.Talafuz}]</p>
                        <h2>${qator.Tarjima}</h2>
                    </div>
                    <hr>
                    <div class="sec2-card-foot">
                        <img src="./Container (4).svg" alt="">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </div>
                </div>
            `
            cardCon.innerHTML = html
        });
    }

}
Olish()
function tozala() {
    yangiSoz.value = ''
    talafuz.value = ''
    tarjima.value = ''
}

let ochish = document.getElementById('ochish')
let day = document.getElementById('day')
let modalCon = document.querySelector('.modal-con')
let month = document.getElementById('month')
let sana = document.getElementById('sana')
let X = document.querySelector('.X')
let cancel = document.getElementById('cancel')

let cardCon = document.getElementById('card-con')


ochish.addEventListener('click', () => {
    modalCon.style.display = 'flex'
})
X.addEventListener('click', () => {
    modalCon.style.display = 'none'
})
cancel.addEventListener('click', () => {
    modalCon.style.display = 'none'
})
setInterval(() => {
    const vaqt = new Date()
    let kun = vaqt.getDate().toString()
    let oy = vaqt.getMonth().toString()
    if (oy == 1) {
        month.innerText = 'Yanvar'
    }
    else if (month == 2) {
        oy.innerText = 'Fevral'
    }
    else if (month == 3) {
        oy.innerText = 'Mart'
    }
    else if (month == 4) {
        oy.innerText = 'Aprel'
    }
    else if (month == 5) {
        oy.innerText = 'May'
    }
    else if (month == 6) {
        oy.innerText = 'Iyun'
    }
    else if (month == 7) {
        oy.innerText = 'Iyul'
    }
    else if (month == 8) {
        oy.innerText = 'Avgust'
    }
    else if (month == 9) {
        oy.innerText = 'Sentabr'
    }
    else if (month == 10) {
        oy.innerText = 'Oktabr'
    }
    else if (month == 11) {
        oy.innerText = 'Noyabr'
    }
    else if (month == 12) {
        oy.innerText = 'Dekabr'
    }
    sana.innerText = `${kun}-${oy}`
})

let voices = [];
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};
const synth = window.speechSynthesis;
function Gapir() {
    const yangiSozElement = document.getElementById('yangi-soz');
    if (!yangiSozElement) {
        console.error("Element topilmadi!");
        return;
    }

    const matn = yangiSozElement.innerText;

    synth.cancel();

    const ovoz = new SpeechSynthesisUtterance(matn);

    ovoz.lang = 'ru-RU';
    ovoz.volume = 1.0;
    ovoz.rate = 1.0;
    ovoz.pitch = 1.0;

    const voices = synth.getVoices();
    const russianVoice = voices.find(v => v.lang.includes('ru') || v.lang.includes('RU'));
    if (russianVoice) {
        ovoz.voice = russianVoice;
    }

    synth.speak(ovoz);

    ovoz.onstart = () => console.log("Hozir gapiryapman...");
    ovoz.onerror = (e) => console.error("Xatolik:", e.error);
}

window.speechSynthesis.onvoiceschanged = () => {
    console.log("Ovozlar tayyor:", synth.getVoices().length, "ta ovoz topildi.");
};