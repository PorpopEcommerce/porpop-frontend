'use client'

interface SubHeadingProps {
    title: string,
    center?: boolean
}

const SubHeading: React.FC<SubHeadingProps> = ({title, center}) => {
    return  <div className={center ? 'text-center' : 'text-start'}>
        <h2 className="font-semibold text-xl">{title}</h2>
    </div> ;
}
 
export default SubHeading;