const supabaseUrl = 'https://ayriinfhhziwoxlgwpem.supabase.co';
const supabaseKey = 'sb_publishable_BDCOwMVcpeDIr7FbHp7rUA_kvtMFX8N';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. GLOBAL O'ZGARUVCHILAR (Hammasi bir joyda, "let" faqat bir marta ishlatilgan)
let savollar = [];
let natijalar = [];
let hozirgiIndex = 0;
let tanlangan = false;
let vaqt = 20;
let taymerInterval;

let togriJavob = document.getElementById('togriJavob');
let natija = document.getElementById('natija');
let javobBox = document.getElementById('sec2-javob');
let savolQuti = document.querySelector('.sec2-btn-con');

async function Olish() {
    const { data, error } = await _supabase
        .from('Test')
        .select('*');

    if (error) {
        alert('Xatolik yuz berdi: ' + error.message);
    } else {
        savollar = data;
        EkrangaChiqarish();
    }
}
Olish();

function EkrangaChiqarish() {
    if (savollar.length === 0) return;

    let btnA = document.getElementById('javob1');
    let btnB = document.getElementById('javob2');
    let btnC = document.getElementById('javob3');
    let btnD = document.getElementById('javob4');
    let savolSoz = document.getElementById('savol-soz');
    let barchaTugmalar = savolQuti.querySelectorAll('button');
    let savolNomer = document.getElementById('savolNomer');

    natija.innerText = "";
    javobBox.className = "sec2-javob";
    togriJavob.innerText = "O'ylab javob bering !";
    tanlangan = false;

    barchaTugmalar.forEach(btn => {
        btn.classList.remove('yashil', 'qizil');
    });

    savolNomer.innerText = `${hozirgiIndex + 1} / ${savollar.length}`;
    btnA.innerText = savollar[hozirgiIndex].A;
    btnB.innerText = savollar[hozirgiIndex].B;
    btnC.innerText = savollar[hozirgiIndex].C;
    btnD.innerText = savollar[hozirgiIndex].D;
    savolSoz.innerText = savollar[hozirgiIndex].Savol;

    updateProgressBar();
    taymerniBoshlash();
}

savolQuti.addEventListener('click', (e) => {
    let bosilganBtn = e.target.closest('button');
    if (!bosilganBtn || tanlangan) return;

    clearInterval(taymerInterval);
    let tanlanganHarf = bosilganBtn.querySelectorAll('span')[0].innerText;
    let togriJavobHarfi = savollar[hozirgiIndex].Javob;
    tanlangan = true;

    if (tanlanganHarf === togriJavobHarfi) {
        bosilganBtn.classList.add('yashil');
        javobBox.className = "sec2-javob yashil";
        natija.innerText = "✅ To'g'ri";
        natijalar[hozirgiIndex] = 'togri';
    } else {
        bosilganBtn.classList.add('qizil');
        javobBox.className = "sec2-javob qizil";
        natija.innerText = "❌ Xato";
        natijalar[hozirgiIndex] = 'xato';

        let tugmalar = savolQuti.querySelectorAll('button');
        tugmalar.forEach(t => {
            if (t.querySelectorAll('span')[0].innerText === togriJavobHarfi) {
                t.classList.add('yashil');
            }
        });
    }
    updateProgressBar();
});

function updateProgressBar() {
    let dots = document.querySelectorAll('.progress-bar .dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active', 'togri', 'xato');
        if (natijalar[index]) {
            dot.classList.add(natijalar[index] === 'togri' ? 'togri' : 'xato');
        } else if (index === hozirgiIndex) {
            dot.classList.add('active');
        }
    });
}

function taymerniBoshlash() {
    vaqt = 21;
    clearInterval(taymerInterval);
    const taymerEkrani = document.querySelector('.fa-clock').parentElement;

    taymerInterval = setInterval(() => {
        vaqt--;
        let sekunt = vaqt < 10 ? '0' + vaqt : vaqt;
        taymerEkrani.innerHTML = `<i class="fa-solid fa-clock"></i> 00:${sekunt}`;

        if (vaqt <= 0) {
            vaqtTugadi();
        }
    }, 1000);
}

function vaqtTugadi() {
    clearInterval(taymerInterval);
    if (tanlangan) return;
    tanlangan = true;

    javobBox.className = "sec2-javob qizil";
    natija.innerText = "⏰ Vaqt tugadi!";
    natijalar[hozirgiIndex] = 'xato';

    let togriJavobHarfi = savollar[hozirgiIndex].Javob;
    let tugmalar = savolQuti.querySelectorAll('button');
    tugmalar.forEach(t => {
        if (t.querySelectorAll('span')[0].innerText === togriJavobHarfi) {
            t.classList.add('yashil');
        }
    });
    updateProgressBar();
}

function Keyingi() {
    if (!tanlangan) return;

    hozirgiIndex++;

    if (hozirgiIndex < savollar.length) {
        EkrangaChiqarish();
    } else {
        NatijaniKorsatish();
    }
}

function NatijaniKorsatish() {
    clearInterval(taymerInterval);

    let togriTopilganlar = natijalar.filter(n => n === 'togri').length;
    let xatoTopilganlar = savollar.length - togriTopilganlar;

    const savolSoz = document.getElementById('savol-soz');
    const variantlarQutisi = document.querySelector('.sec2-btn-con');
    const pastkiPanel = document.getElementById('sec2-javob');
    const tepadagiMaLumotlar = document.querySelector('.sec2-top-info'); 

    if (tepadagiMaLumotlar) tepadagiMaLumotlar.style.display = 'none'; 
    variantlarQutisi.style.display = 'none'; 
    pastkiPanel.style.display = 'none'; 

    savolSoz.innerHTML = `
        <div class="natija-konteyner">
            <h2 style="color: #6366f1; font-size: 32px; margin-bottom: 20px;">Test Yakunlandi!</h2>
            <div class="natija-statistika">
                <p style="font-size: 20px; margin: 10px 0;">✅ To'g'ri javoblar: <strong>${togriTopilganlar} ta</strong></p>
                <p style="font-size: 20px; margin: 10px 0;">❌ Xato javoblar: <strong>${xatoTopilganlar} ta</strong></p>
            </div>
            <button onclick="location.reload()" class="qayta-topshirish">
                Qayta topshirish <i class="fa-solid fa-rotate-right"></i>
            </button>
        </div>
    `;
}