let xabar = document.getElementById('xabar')
let input = document.getElementById('input')
let yubor = document.getElementById('yubor')

let token = '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'

let xotira = [
    {
        role: 'system',
        content: "Sen istalgan savollarga javob bera oladigan kuchli Zebo san .Bundan tashqari sen do'stona munosabatlarga ham juda iliqlik bilan yondashasan. Hamma savollarga to'g'ri va aniq eng muhim o'zbekcha javob ber"
    }
]


yubor.addEventListener('click', (e) => {
    e.preventDefault()
    const malumot = input.value.trim();
    xabar.innerHTML += `
      <div class=" p-4 flex justify-end">
            <span class="bg-[#4F46E5] flex items-center gap-[20px] text-white p-2 rounded ">${malumot}<i class="fa-solid fa-user"></i></span>
        </div>
    `
    xotira.push({
        role: "user", content: malumot
    })
    input.value = ''
    xabar.scrollTop = xabar.scrollHeight
    fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: xotira
        })
    })
        .then(response => response.json())
        .then(data => {
            let xabarAI = data.choices[0].message.content
            let chiroyli = marked.parse(xabarAI)
            xotira.push({
                role: "system", content: xabarAI
            })

            xabar.innerHTML += `
            <div class=" p-4 ">
                <span class="flex items-center gap-[20px] bg-[#3525CD0D] text-[#3525CD] w-[90%] p-2  rounded inline-block"><i class="fa-solid fa-robot"></i>${chiroyli}</span>
            </div>
    `
    xabar.scrollTop = xabar.scrollHeight
        })
    .catch(error => console.error('Xatolik:', error));
});
