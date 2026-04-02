const url = 'https://clefdjiuabnztkmdwnjc.supabase.co'
const token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN'

const _supabase = supabase.createClient(url, token)

const email = document.getElementById("email")
const password = document.getElementById("password")

async function login() {
    const { data:foydalanuvchi, error:xatolik } = await _supabase
        .from("signin")
        .select("*")
        .eq("email", email.value)
        .eq("parol", password.value)

    if(xatolik){
        alert("Xatolik" + xatolik)
        return
    }

    if (foydalanuvchi.length > 0) {
        alert("Siz tizimga kirdiniz")
        window.location.href = "page4.html"
    }
    
    else{
        alert("Siz ro'yhatdan o'tmagansiz")
    }
}

function Sign() {
    window.location.href = 'signin.html'
}