const url = 'https://clefdjiuabnztkmdwnjc.supabase.co'
const token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN'

const _supabase = supabase.createClient(url, token)

async function Yuborish() {
    let ism = document.getElementById('ism')
    let parol = document.getElementById('password')
    let email = document.getElementById('email')

    if (ism.value == "" && parol.value == "") {
        alert("Maydonlarni to'ldiring")
        return
    }

    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from('signin')
        .select('*')
        .eq('ism', ism.value)
        .eq('parol', parol.value)
        .eq('email', email.value)
    if (xatolik) {
        alert("Xatolik yuz berdi" + xatolik.message)
        return
    }
    if (foydalanuvchi.length > 0) {
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "index.html"
    }
    else {
        const { error } = await _supabase
            .from('signin')
            .insert([
                {
                    ism: ism.value,
                    parol: parol.value,
                    email: email.value
                }
            ])
        if (error) {
            alert("Xatolik yuz berdi" + error.message)
        }
        else {
            alert("Siz ro'yhatdan o'tdingiz tabriklaymiz!!!")
            window.location.href = 'index.html'
        }
    }

}


function tozala() {
    document.getElementById("ism").value = ''
    document.getElementById("password").value = ''
    document.getElementById("email").value = ''
    document.getElementById("password-accept").value = ''
}
