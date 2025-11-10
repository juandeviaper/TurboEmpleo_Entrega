

import { useState } from "react";
import RegisterAspirante from "./RegisterAspirante";
import RegisterEmpresa from "./RegisterEmpresa";

function Register() {
	// step: 0 = select account type, 1 = form, 2 = verification/finish
	const [step, setStep] = useState(0);
	const [selected, setSelected] = useState(null); // 'aspirante' | 'empresa'

	const handleContinue = () => {
		if (step === 0) {
			if (!selected) return; // nothing selected
			setStep(1);
			// scroll to top of form
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const onFormSuccess = () => {
		// called by the child form via prop when registration succeeds
		setStep(2);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#7c3aed]/10 via-white to-[#ffde59]/10 flex flex-col pt-24 relative overflow-hidden">
			{/* Formas geométricas animadas */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Grupo 1 - Superior */}
				{/* Formas geométricas animadas - Superior */}
				<div className="absolute top-[5%] left-[5%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] min-w-[150px] min-h-[150px] bg-[#A67AFF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
				<div className="absolute top-[2%] right-[10%] w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] min-w-[120px] min-h-[120px] bg-[#ffde59] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
				<div className="absolute top-[15%] left-[30%] w-[18vw] h-[18vw] max-w-[200px] max-h-[200px] min-w-[100px] min-h-[100px] bg-[#A67AFF] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-3000"></div>
				
				{/* Grupo 2 - Centro */}
				<div className="absolute top-[40%] left-[8%] w-[22vw] h-[22vw] max-w-[280px] max-h-[280px] min-w-[140px] min-h-[140px] bg-[#ffde59] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
				<div className="absolute top-[35%] right-[15%] w-[28vw] h-[28vw] max-w-[320px] max-h-[320px] min-w-[160px] min-h-[160px] bg-[#A67AFF] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-5000"></div>
				<div className="absolute top-[50%] right-[5%] w-[15vw] h-[15vw] max-w-[180px] max-h-[180px] min-w-[90px] min-h-[90px] bg-[#ffde59] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
				
				{/* Grupo 3 - Inferior */}
				<div className="absolute bottom-[10%] left-[12%] w-[24vw] h-[24vw] max-w-[290px] max-h-[290px] min-w-[145px] min-h-[145px] bg-[#A67AFF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
				<div className="absolute bottom-[5%] right-[8%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] min-w-[175px] min-h-[175px] bg-[#ffde59] rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
				<div className="absolute bottom-[15%] left-[40%] w-[20vw] h-[20vw] max-w-[240px] max-h-[240px] min-w-[120px] min-h-[120px] bg-[#A67AFF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-7000"></div>
			</div>
			<div className="container mx-auto px-6 py-12 flex-1 relative z-10">
				<div className="max-w-3xl mx-auto">
					<div className="text-center mb-8">
						<p className="text-sm text-gray-500">Crear cuenta</p>
						<h1 className="text-3xl font-extrabold text-gray-900">¡Bienvenido!</h1>
					</div>

					{step === 0 && (
						<div className="space-y-4">
							<div
								role="button"
								onClick={() => setSelected('aspirante')}
								className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer transform hover:scale-105 ${selected === 'aspirante' ? 'border-purple-500 bg-white shadow-lg hover:shadow-purple-200' : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'}`}>
								<div className={`w-12 h-12 flex items-center justify-center rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-3 ${selected === 'aspirante' ? 'bg-purple-100' : 'bg-gray-100'}`}>
									<svg className="w-6 h-6 text-[#7c3aed] transform transition-transform hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Aspirante</div>
									<div className="text-sm text-gray-500">Busco oportunidades laborales.</div>
								</div>
							</div>

							<div
								role="button"
								onClick={() => setSelected('empresa')}
								className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 cursor-pointer transform hover:scale-105 ${selected === 'empresa' ? 'border-purple-500 bg-white shadow-lg hover:shadow-purple-200' : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'}`}>
								<div className={`w-12 h-12 flex items-center justify-center rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-3 ${selected === 'empresa' ? 'bg-purple-100' : 'bg-gray-100'}`}>
									<svg className="w-6 h-6 text-[#7c3aed] transform transition-transform hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v4H3zM4 9h16v11H4z"/></svg>
								</div>
								<div>
									<div className="font-semibold text-gray-900">Empresa</div>
									<div className="text-sm text-gray-500">Busco contratar talento.</div>
								</div>
							</div>

							<div className="flex justify-center mt-6">
								<div className="flex items-center gap-2">
									<span className={`w-8 h-2 rounded-full ${step===0? 'bg-[#7c3aed]': 'bg-gray-300'}`}></span>
									<span className="w-8 h-2 rounded-full bg-gray-200"></span>
									<span className="w-8 h-2 rounded-full bg-gray-200"></span>
								</div>
							</div>
						</div>
					)}

					{step === 1 && (
						<div className="bg-white rounded-2xl shadow p-6">
							{selected === 'aspirante' ? (
								<RegisterAspirante embedded={true} onSuccess={onFormSuccess} />
							) : (
								<RegisterEmpresa embedded={true} onSuccess={onFormSuccess} />
							)}
						</div>
					)}

					{step === 2 && (
						<div className="bg-white rounded-2xl shadow p-8 text-center">
							<h2 className="text-xl font-semibold text-gray-900">Verificación por correo</h2>
							<p className="text-gray-600 mt-4">Hemos enviado un correo de verificación a la dirección proporcionada. Por favor revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.</p>
							<div className="mt-6">
								<button onClick={() => { setStep(0); setSelected(null); }} className="text-sm text-purple-600">Volver al inicio</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Continue bar fixed at bottom like the attachment (visible only on step 0) */}
			{step === 0 && (
				<div className="sticky bottom-6 px-6">
					<div className="max-w-3xl mx-auto">
						<button onClick={handleContinue} className="w-full bg-[#7c3aed] text-white rounded-full py-4 font-semibold shadow-lg hover:opacity-95 disabled:opacity-60" disabled={!selected}>
							Continuar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Register;
