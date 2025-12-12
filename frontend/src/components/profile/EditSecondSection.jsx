function EditSecondSection({ formData = {}, onChange = () => {} }){
    const{description, hard_skills, soft_skills} = formData
    return(
        <>
        <div className="mt-16 p-6 sm:p-8 rounded-xl bg-[#efecff] overflow-hidden">
            <div className="space-y-6">

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-center">Description</h3>
                <textarea className="w-full bg-white border-2 border-blue-300 rounded-xl p-4 leading-relaxed break-words" name="description" value={description ?? ""} onChange={onChange}></textarea>
            </div>
            
            

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-left">Hard skills</h3>
                <textarea className="bg-white border-2 border-blue-300 p-3 rounded-xl max-w-2xl mx-auto md:mx-0" name="hard_skills" value={hard_skills ?? ""} onChange={onChange}></textarea>
            </div>

            <div className="grid md:grid-cols-[200px_1fr] gap-4 items-center">
                <h3 className="bg-white font-bold rounded-full text-xl md:text-2xl px-4 py-2 text-center md:text-left">Soft skills</h3>
                <textarea className="bg-white border-2 border-blue-300 p-3 rounded-xl max-w-2xl mx-auto md:mx-0" name="soft_skills" value={soft_skills ?? ""} onChange={onChange}></textarea>
            </div>

            </div>
        </div>
        </>
    );
}

export default EditSecondSection;