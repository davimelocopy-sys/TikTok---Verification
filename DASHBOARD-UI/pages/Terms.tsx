import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Termos de Uso</h1>

                <div className="prose prose-slate max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Aceitação dos Termos</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Ao acessar e utilizar o TikTok AntiBan ("Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Uso.
                            Se você não concorda com qualquer parte destes termos, não deve utilizar nosso serviço.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Descrição do Serviço</h2>
                        <p className="text-slate-600 leading-relaxed">
                            O TikTok AntiBan é uma ferramenta de análise e auditoria de conformidade para criadores de conteúdo na plataforma TikTok.
                            Nosso serviço oferece análises automatizadas de vídeos e roteiros para identificar potenciais violações das Diretrizes da Comunidade do TikTok.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Uso Aceitável</h2>
                        <p className="text-slate-600 leading-relaxed mb-2">Você concorda em:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                            <li>Utilizar o serviço apenas para fins legítimos de análise de conteúdo</li>
                            <li>Não tentar burlar ou manipular os sistemas de análise</li>
                            <li>Respeitar os direitos de propriedade intelectual de terceiros</li>
                            <li>Manter a confidencialidade de suas credenciais de acesso</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Limitação de Responsabilidade</h2>
                        <p className="text-slate-600 leading-relaxed">
                            O TikTok AntiBan fornece análises automatizadas baseadas em interpretação algorítmica das Diretrizes do TikTok.
                            Não garantimos que o uso do serviço impedirá restrições de conta ou remoção de conteúdo pela plataforma TikTok.
                            A responsabilidade final pela conformidade do conteúdo permanece com o criador.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Modificações dos Termos</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas
                            através do e-mail cadastrado ou aviso no dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Contato</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Para questões relacionadas aos Termos de Uso, entre em contato através do e-mail:
                            <a href="mailto:davimelocopy@gmail.com" className="text-indigo-600 hover:text-indigo-700 ml-1 underline">
                                davimelocopy@gmail.com
                            </a>
                        </p>
                    </section>

                    <p className="text-sm text-slate-400 mt-8 pt-6 border-t border-slate-200">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
