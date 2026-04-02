let token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN'
let url = 'https://clefdjiuabnztkmdwnjc.supabase.co'

const _supabase = supabase.createClient(url, token)

const email = document.getElementById("email")

async function Yuborish() {
    let ism = document.getElementById('ism')
    let parol = document.getElementById('parol')
    let yosh = document.getElementById('yosh')

    if (ism.value == "" && parol.value == "") {
        alert("Maydonlarni to'ldiring")
        return
    }

    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from('signin')
        .select('*')
        .eq('ism', ism.value)
        .eq('email', email.value)
        .eq('parol', parol.value)
    if (xatolik) {
        alert("Xatolik yuz berdi" + error.message)
        return
    }
    if (foydalanuvchi.length > 0) {
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "login.html"
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
            window.location.href = 'login.html'
        }
    }

}