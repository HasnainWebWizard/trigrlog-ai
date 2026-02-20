import { Sparkles } from "lucide-react";
import ToneSettings from "./ToneSettings";


export default function AiPernsonality() {
    return (
        <>
            <aside className="w-full lg:w-80 lg:shrink-0">
                <div className="sticky top-8 space-y-6">
                    <ToneSettings />

                    {/* Quick Stats / Pro Tip Card */}
                    <div className="rounded-2xl bg-linear-to-br from-cyan-500/10 to-blue-600/10 p-5 border border-cyan-500/20">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                            <Sparkles size={16} className="text-cyan-400" />
                            Lord's Tip
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-gray-400">
                            Posts with "Job Hunter" tone and at least 3 keywords get 45% more recruiter engagement on average.
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}