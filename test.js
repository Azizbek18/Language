const supabaseUrl = 'https://ayriinfhhziwoxlgwpem.supabase.co'
const supabaseKey = 'sb_publishable_BDCOwMVcpeDIr7FbHp7rUA_kvtMFX8N'

const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

let savollar = []
let hozirgiIndex = 0
let tanlangan = false
let togriJavob = document.getElementById('togriJavob')

async function Olish() {

    const { data, error } = await _supabase
        .from('Test')
        .select('*')
    if (error) {
        alert('Xatolik yuz berdi!', error.message)
    }
    else {
        console.log(data);
        savollar = data
    }
}
Olish()

let savolQuti = document.querySelector('.sec2-btn-con')
function EkrangaChiqarish() {
    let btnA = document.getElementById('javob1')
    let btnB = document.getElementById('javob2')
    let btnC = document.getElementById('javob3')
    let btnD = document.getElementById('javob4')
    let savolSoz = document.getElementById('savol-soz')
    let barchaTugmalar = savolQuti.querySelectorAll('button');
    let savolNomer = document.getElementById('savolNomer')
    savolNomer.innerText = `${hozirgiIndex + 1} / 10`
    togriJavob.innerText = "O'ylab javob bering"
    
    barchaTugmalar.forEach(btn => {
        btn.classList.remove('yashil', 'qizil');
    });
    tanlangan = false
    savollar.forEach(element => {
        btnA.innerText = savollar[hozirgiIndex].A
        btnB.innerText = savollar[hozirgiIndex].B
        btnC.innerText = savollar[hozirgiIndex].C
        btnD.innerText = savollar[hozirgiIndex].D
        savolSoz.innerText = savollar[hozirgiIndex].Savol
    });
}

EkrangaChiqarish()

function Keyingi() {
    hozirgiIndex++
    EkrangaChiqarish()
}
savolQuti.addEventListener('click', (e) => {
    let bosilganBtn = e.target.closest('button');
    
    if (!bosilganBtn || tanlangan) return;

    let tanlanganHarf = bosilganBtn.querySelectorAll('span')[0].innerText;
    let togriJavobHarfi = savollar[hozirgiIndex].Javob;

    tanlangan = true; 

    if (tanlanganHarf === togriJavobHarfi) {

        bosilganBtn.classList.add('yashil');
        togriJavob.innerText = "Tabriklaymiz"
    } else {
        bosilganBtn.classList.add('qizil');
        togriJavob.innerText = "Keyingi safar o'ylab javob bering."
        let barchaTugmalar = savolQuti.querySelectorAll('button');
        barchaTugmalar.forEach(tugma => {
            let tugmaHarfi = tugma.querySelectorAll('span')[0].innerText;
            if (tugmaHarfi === togriJavobHarfi) {
                tugma.classList.add('yashil');
            }
        });
    }
});