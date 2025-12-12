function SecondSection({
    description,
    hard_skills,
    soft_skills
}){
    return(
        
        <div className="mt-16 p-6 sm:p-8 rounded-xl bg-[#efecff] overflow-hidden">
            <div className="space-y-6">

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-center">Description</h3>
                <p className="bg-white rounded-xl p-4 leading-relaxed break-words max-w-prose w-full">
                {description}
                </p>
            </div>
            

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-center">Hard skills</h3>
                <p className="bg-white rounded-xl p-4 leading-relaxed break-words max-w-prose w-full">
                    {hard_skills}
                </p>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-center">Soft skills</h3>
                <p className="bg-white rounded-xl p-4 leading-relaxed break-words max-w-prose w-full">
                    {soft_skills}
                </p>
            </div>

            </div>
        </div>
        
    );
}

export default SecondSection;