export function loginUser() {
	const form = document.getElementById('login');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const emailInput = form.querySelector('#email');
		const passwordInput = form.querySelector('#password');
		if (!emailInput || !passwordInput) return;

		const email = emailInput.value.trim();
		const password = passwordInput.value;

		if (!email || !password) {
			alert('Veuillez remplir tous les champs.');
			return;
		}

		try {
			const res = await fetch('http://localhost:3000/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				alert(data.message || 'Connexion réussie.');
				window.location.href = '/index.html';
			} else {
				alert(data.message || `Erreur: ${res.status}`);
			}
		} catch (err) {
			console.error(err);
			alert('Erreur réseau — impossible de contacter le serveur.');
		}
	});
}
