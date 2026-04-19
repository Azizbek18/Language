const supabaseUrl = 'https://ayriinfhhziwoxlgwpem.supabase.co';
const supabaseKey = 'sb_publishable_BDCOwMVcpeDIr7FbHp7rUA_kvtMFX8N';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let users = [];

// Sahifa yuklanganda ishga tushadi
document.addEventListener('DOMContentLoaded', () => {
    fetchData('total'); // Dastlab hamma vaqtdagi reytingni ko'rsatish
    setupFilters();
});

// 2. Supabase-dan ma'lumotlarni olish
async function fetchData(filterType) {
    let query = _supabase.from('rating').select('*');

    const now = new Date();
    if (filterType === 'weekly') {
        // Oxirgi 7 kunlik ma'lumot
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', lastWeek);
    } else if (filterType === 'monthly') {
        // Oxirgi 30 kunlik ma'lumot
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', lastMonth);
    }

    // Ballar bo'yicha kamayish tartibida saralash
    const { data, error } = await query.order('score', { ascending: false });

    if (error) {
        console.error("Ma'lumot olishda xatolik:", error.message);
        return;
    }

    users = data;
    renderAll();
}

// 3. Filtrlash tugmalarini (Haftalik, Oylik, Umumiy) boshqarish
function setupFilters() {
    const filterButtons = {
        '.week': 'weekly',
        '.month': 'monthly',
        '.obs': 'total'
    };

    Object.entries(filterButtons).forEach(([selector, type]) => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', function() {
                // Aktiv tugma dizaynini o'zgartirish
                document.querySelectorAll('.three > div').forEach(el => {
                    el.style.backgroundColor = 'transparent';
                    el.style.color = '#64748B'; // Muted rang
                });
                this.style.backgroundColor = 'white';
                this.style.color = '#3525CD';

                fetchData(type);
            });
        }
    });
}

// 4. Jadvalni (Table) chizish
function renderLeaderboard() {
    const tbody = document.querySelector(".leaderboard-table tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    users.forEach((user, index) => {
        const isMe = user.is_me;
        const row = document.createElement("tr");
        if (isMe) row.classList.add("current-user-row");

        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td class="user">
                <img src="${user.img_url || 'https://via.placeholder.com/40'}" alt="">
                <div>
                    <span class="user-name">${user.name}</span>
                    ${isMe ? '<span class="badge">O\'ZINGIZ</span>' : ''}
                </div>
            </td>
            <td class="points">${user.score}</td>
            <td>${user.streak} kun</td>
            <td>${user.words.toLocaleString()}</td>
            <td class="change">${renderChange(user.change)}</td>
        `;
        tbody.appendChild(row);
    });
}

// O'zgarish belgisini chizish (↑ 1 yoki -)
function renderChange(change) {
    if (change > 0) return `<span class="change up">↑ ${change}</span>`;
    if (change < 0) return `<span class="change down">↓ ${Math.abs(change)}</span>`;
    return '-';
}

// 5. Yuqori Podiumni (Top 3) yangilash
function updatePodium() {
    if (users.length === 0) return;

    // 1-o'rin (Sardor M. - Stage 2 markazda)
    const first = users[0];
    const stage2 = document.querySelector(".stage2");
    if (first && stage2) {
        stage2.querySelector("p").innerText = first.name;
        stage2.querySelector("h1").innerHTML = `${first.score} <span>Ball</span>`;
    }

    // 2-o'rin (Nilufar X. - Stage 1 chapda)
    const second = users[1];
    const stage1 = document.querySelector(".stage:not(.card2):not(.card3)");
    if (second && stage1) {
        stage1.querySelector("p").innerText = second.name;
        stage1.querySelector("h1").innerHTML = `${second.score} <span>Ball</span>`;
    }

    // 3-o'rin (Akbar Y. - Stage 3 o'ngda)
    const third = users[2];
    const stage3 = document.querySelector(".stage3");
    if (third && stage3) {
        stage3.querySelector("p").innerText = third.name;
        stage3.querySelector("h1").innerHTML = `${third.score} <span>Ball</span>`;
    }
}

// Hammasini bittada yangilash
function renderAll() {
    renderLeaderboard();
    updatePodium();
    updateFooterAlert();
}

// Pastki qismdagi tabrik xabari
function updateFooterAlert() {
    const me = users.find(u => u.is_me);
    const myRank = users.findIndex(u => u.is_me) + 1;
    
    if (me && myRank > 0) {
        const alertInfo = document.querySelector(".alert-info small");
        if (alertInfo) {
            alertInfo.innerText = `Siz ${users.length} o'quvchidan ${myRank}-o'rindasiz`;
        }
    }
}