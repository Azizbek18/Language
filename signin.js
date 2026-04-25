const url = 'https://clefdjiuabnztkmdwnjc.supabase.co';
const token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN';
const _supabase = supabase.createClient(url, token);

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ism = document.getElementById('ism').value;
    const email = document.getElementById('email').value;
    const parol = document.getElementById('password').value;
    const tasdiqParol = document.getElementById('password-accept').value;

    if (parol !== tasdiqParol) {
        alert("Parollar bir-biriga mos kelmadi!");
        return;
    }

    const { data: mavjudFoydalanuvchi } = await _supabase
        .from('signin')
        .select('email')
        .eq('email', email);

    if (mavjudFoydalanuvchi && mavjudFoydalanuvchi.length > 0) {
        alert("Bu email bilan allaqachon ro'yxatdan o'tilgan!");
        return;
    }

    const { error } = await _supabase
        .from('signin')
        .insert([{ ism: ism, email: email, parol: parol }]);

    if (error) {
        alert("Xatolik: " + error.message);
    } else {
        alert("Siz muvaffaqiyatli ro'yxatdan o'tdingiz!");
        window.location.href = 'index.html';
    }
});