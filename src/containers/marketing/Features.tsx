

export default function Features() {
    return (
        <>
            <section id="features" className="py-24 bg-[#0d1117]">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-12">Automate Your Professional Presence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <div className="text-cyan-400 font-bold text-xl mb-2">01. Connect</div>
                            <p className="text-gray-400 text-sm">Link your GitHub account in one click with secure OAuth.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <div className="text-cyan-400 font-bold text-xl mb-2">02. Commit</div>
                            <p className="text-gray-400 text-sm">Keep coding as usual. We track your pushes across your chosen repos.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/5">
                            <div className="text-cyan-400 font-bold text-xl mb-2">03. Grow</div>
                            <p className="text-gray-400 text-sm">Review AI-generated posts and share your progress with the world.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}