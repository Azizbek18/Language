const url = 'https://clefdjiuabnztkmdwnjc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZWZkaml1YWJuenRrbWR3bmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NTE5MzUsImV4cCI6MjA5MDUyNzkzNX0.Ol6JNWvyLpth4rrjVD6TQLzuiA8jXujXmKfzaYtPLhc';

const _supabase = supabase.createClient(url, supabaseKey)

const email = document.getElementById("email")
const password = document.getElementById("parol")

async function login() {
    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from("signin")
        .select("*")
        .eq("email", email.value)
        .eq("parol", password.value)

    if (xatolik) {
        alert("Xatolik" + xatolik)
        return
    }

    if (foydalanuvchi.length > 0) {
        alert("Siz tizimga kirdiniz")
        window.location.href = "boshlash.html"
    }

    else {
        alert("Siz ro'yhatdan o'tmagansiz")
    }
}

function Sign() {
    window.location.href = 'signin.html'
}