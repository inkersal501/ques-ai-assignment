import projectJS from "../js/project";

function ProjectCard({project}) {

  return (
    <div className="rounded-lg border border-[#999] p-1 flex gap-4 w-full md:w-xs">
        <div className="p-4 bg-[#F8A01D] rounded-lg w-[25%]">
            <h1 className="text-4xl text-white text-center">{projectJS.reduceProjectName(project.name)}</h1>
        </div>
        <div className="w-[75%] flex flex-col justify-between">
            <div className="flex flex-col">
              <h4 className="text-lg text-[#782ba7] text-xl">{project.name}</h4>
              {project.transcripts > 0 && <h6 className="font-bold text-xs">{project.transcripts} Files</h6>}
            </div>
            <p className="text-xs text-[#999]">{projectJS.convertDate(project.lastUpdated)}</p>
        </div>
    </div>
  )
}

export default ProjectCard;