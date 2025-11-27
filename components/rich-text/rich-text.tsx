import { useRichText } from "@/hooks/use-rich-text";
import { Button, Modal } from "@heroui/react";
import { EditorContent } from "@tiptap/react";
import { useRef } from "react";

interface RichTextProp {
  isOpen?: boolean;

  setIsOpen?: (isOpen: boolean) => void;
}

export const RichText = ({ isOpen, setIsOpen }: RichTextProp) => {
  const { editor } = useRichText();

  const menuContainerRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

  return (
    <Modal>
      <Modal.Container
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        ref={menuContainerRef}
      >
        <Modal.Dialog className="bg-surface-secondary/30 backdrop-blur-2xl">
          {({ close }) => (
            <>
              <Modal.Header>
                {/* <Modal.Icon className="bg-accent-soft text-accent-soft-foreground"> */}
                {/*   <Icon className="size-5" icon="gravity-ui:circle-check" /> */}
                {/* </Modal.Icon> */}
                <Modal.Heading>
                  <Button
                    onPress={() =>
                      editor
                        .chain()
                        .focus()
                        .setImage({
                          src: "https://images.pexels.com/photos/31559052/pexels-photo-31559052.jpeg",
                        })
                        .run()
                    }
                  >
                    add Image
                  </Button>

                  <Button onPress={() => console.log(editor.getHTML())}>
                    print
                  </Button>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <EditorContent editor={editor} className="w-full" />
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
};
