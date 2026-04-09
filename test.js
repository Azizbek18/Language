PS C:\Users\NITRO\Desktop\Language> git add .
>> git commit -m "Konfliktlar hal qilindi"
[Sardor e4726bb] Konfliktlar hal qilindi
PS C:\Users\NITRO\Desktop\Language> git push origin Sardor
Enumerating objects: 84, done.
Counting objects: 100% (74/74), done.
Delta compression using up to 16 threads
Compressing objects: 100% (47/47), done.
Writing objects: 100% (48/48), 10.89 KiB | 796.00 KiB/s, done.
Total 48 (delta 37), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (37/37), completed with 12 local objects.
remote: error: GH013: Repository rule violations found for refs/heads/Sardor.
remote: 
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote: 
remote:     - Push cannot contain secrets
remote: 
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:
remote:       —— Groq API Key ——————————————————————————————————————
remote:        locations:
remote:          - commit: 5cca57be18845c3df192cb3be293e477a0bdd4c8
remote:            path: AI.js:5
remote:          - commit: 11603f64a06d8af5d041b1c4d7b93fb2e53b3bfa
remote:            path: AI.js:5
remote:          - commit: fa410b77ccae705243c051a62bf5ad497e7c9b54
remote:            path: AI.js:5
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/Azizbek18/Language/security/secret-scanning/unblock-secret/3Bqg3gytOSbcQN1t4fIrjCv20G2
remote:
remote:
remote:
To https://github.com/Azizbek18/Language.git
 ! [remote rejected] Sardor -> Sardor (push declined due to repository rule violations)
error: failed to push some refs to 'https://github.com/Azizbek18/Language.git'
PS C:\Users\NITRO\Desktop\Language> ^C
PS C:\Users\NITRO\Desktop\Language> git reset --soft origin/Sardor
PS C:\Users\NITRO\Desktop\Language> git add .
>> git commit -m "API kalit olib tashlandi va yangilandi"
[Sardor 6870321] API kalit olib tashlandi va yangilandi
 14 files changed, 924 insertions(+), 376 deletions(-)
 create mode 100644 AI.js
 create mode 100644 sozlarArxivi.js
 create mode 100644 test.js
PS C:\Users\NITRO\Desktop\Language> git push origin Sardor
Enumerating objects: 28, done.
Counting objects: 100% (28/28), done.
Delta compression using up to 16 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (16/16), 6.78 KiB | 1.36 MiB/s, done.
Total 16 (delta 12), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (12/12), completed with 10 local objects.
remote: error: GH013: Repository rule violations found for refs/heads/Sardor.
remote:
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
remote:
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:
remote:       —— Groq API Key ——————————————————————————————————————
remote:        locations:
remote:          - commit: 687032129a7dd58804d3dc2c069d5690590b83c0
remote:            path: AI.js:5
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/Azizbek18/Language/security/secret-scanning/unblock-secret/3Bqg3gytOSbcQN1t4fIrjCv20G2
remote:
remote:
remote:
To https://github.com/Azizbek18/Language.git
 ! [remote rejected] Sardor -> Sardor (push declined due to repository rule violations)
error: failed to push some refs to 'https://github.com/Azizbek18/Language.git'
PS C:\Users\NITRO\Desktop\Language> 