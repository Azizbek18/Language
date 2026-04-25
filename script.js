const url = 'https://clefdjiuabnztkmdwnjc.supabase.co';
const token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN';
const _supabase = supabase.createClient(url, token);

function xabarBer(matn, tur = "success") {
    Toastify({
        text: matn,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: tur === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "#ff5f6d",
        }
    }).showToast();
}

async function login() {
    const emailInput = document.getElementById("login-email").value;
    const parolInput = document.getElementById("login-parol").value;

    if (!emailInput || !parolInput) {
        xabarBer("Iltimos, hamma maydonlarni to'ldiring!", "error");
        return;
    }

    const { data: foydalanuvchi, error } = await _supabase
        .from("signin")
        .select("*")
        .eq("email", emailInput)
        .eq("parol", parolInput);

    if (error) {
        xabarBer("Tizimda xatolik yuz berdi", "error");
        return;
    }

    if (foydalanuvchi && foydalanuvchi.length > 0) {
        xabarBer("Xush kelibsiz! Tizimga kirilmoqda...");
        setTimeout(() => {
            window.location.href = "boshlash.html";
        }, 1500);
    } else {
        xabarBer("Email yoki parol noto'g'ri!", "error");
    }
}