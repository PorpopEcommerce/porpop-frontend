import DragAndDrop from "@/components/dashboard/DragAndDrop";
import Section from "@/components/dashboard/Section";

export default function Upload() {
  return (
    <Section>
      <h4 className="text-white text-lg mb-6">Thumbnail</h4>
      <div className="space-y-2">
        <p className="text-grey-300">Photo</p>
        <DragAndDrop />
      </div>
    </Section>
  );
}
