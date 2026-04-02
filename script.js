let token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN'
let url = 'https://clefdjiuabnztkmdwnjc.supabase.co'

const _supabase = supabase.createClient(url, token)

const email = document.getElementById("email")
const password = document.getElementById("password")

async function login() {
    const { data, error } = await _supabase
        .from("signin")
        .select("*")
        .eq("email", email.value)
        .eq("parol", password.value)

    if (error) {
        alert("Xatolik yuz berdi")
        console.log(error)
        return
    }

    if (data.length > 0) {
        alert("Siz tizimga kirdingiz")
        window.location.href = "page4.html"
    } else {
        alert("Email yoki parol noto‘g‘ri")
    }
}