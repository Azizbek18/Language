const url = 'https://clefdjiuabnztkmdwnjc.supabase.co'
const token = 'sb_publishable_IOtRCnm8B19gdABXAPKMqA__1-q_1BN'

const _supabase = supabase.createClient(url, token)

async function yubor() {
    const ism = document.getElementById("ism").value.trim()
    const password = document.getElementById("password").value.trim()
    const email = document.getElementById("email").value.trim()
    const password_accept = document.getElementById("password-accept").value.trim()

    if (!ism || !email || !password || !password_accept) {
        alert("Barcha maydonlarni to'ldiring")
        return
    }

    if (password !== password_accept) {
        alert("Parollar mos emas")
        return
    }

    try {
        const { data, error } = await _supabase
            .from('signin')
            .insert([
                {
                    ism: ism,
                    email: email,
                    parol: password
                }
            ])

        if (error) {
            throw error
        }

        alert("Bazaga qo'shildi ✅")
        tozala()

    } catch (err) {
        alert("Xatolik: " + err.message)
        console.error(err)
    }
}

function tozala() {
    document.getElementById("ism").value = ''
    document.getElementById("password").value = ''
    document.getElementById("email").value = ''
    document.getElementById("password-accept").value = ''
}