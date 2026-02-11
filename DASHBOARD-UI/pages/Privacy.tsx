import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>

                <div className="prose prose-slate max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Informações que Coletamos</h2>
                        <p className="text-slate-600 leading-relaxed mb-2">Coletamos as seguintes informações:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                            <li><strong>Dados de Autenticação:</strong> E-mail e credenciais de login via Google OAuth</li>
                            <li><strong>Dados do TikTok:</strong> Informações públicas do perfil e metadados de vídeos (com sua autorização)</li>
                            <li><strong>Dados de Uso:</strong> Logs de auditoria, histórico de análises e interações com o sistema</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Como Utilizamos seus Dados</h2>
                        <p className="text-slate-600 leading-relaxed mb-2">Utilizamos suas informações para:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                            <li>Fornecer e melhorar nossos serviços de análise de conformidade</li>
                            <li>Processar auditorias de vídeos e roteiros</li>
                            <li>Personalizar sua experiência no dashboard</li>
                            <li>Comunicar atualizações importantes sobre o serviço</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Compartilhamento de Dados</h2>
                        <p className="text-slate-600 leading-relaxed">
                            <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.</strong>
                            Compartilhamos dados apenas quando:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4 mt-2">
                            <li>Necessário para fornecer o serviço (ex: integração com API do TikTok)</li>
                            <li>Exigido por lei ou ordem judicial</li>
                            <li>Com sua permissão explícita</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Segurança dos Dados</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado,
                            alteração, divulgação ou destruição. Isso inclui criptografia de dados em trânsito (HTTPS), armazenamento seguro
                            de credenciais e controles de acesso rigorosos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Seus Direitos</h2>
                        <p className="text-slate-600 leading-relaxed mb-2">Você tem direito a:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                            <li>Acessar e revisar seus dados pessoais</li>
                            <li>Solicitar correção de dados incorretos ou incompletos</li>
                            <li>Solicitar a exclusão de sua conta e dados associados</li>
                            <li>Revogar permissões de acesso à API do TikTok a qualquer momento</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Cookies e Tecnologias Similares</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Utilizamos cookies e armazenamento local do navegador para manter sua sessão autenticada e preferências de interface.
                            Você pode configurar seu navegador para recusar cookies, mas isso pode limitar algumas funcionalidades do serviço.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Alterações nesta Política</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através
                            do e-mail cadastrado ou aviso destacado no dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Contato</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Para dúvidas sobre privacidade ou exercer seus direitos, entre em contato:
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

export default Privacy;
