import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from "@chakra-ui/react";

interface ModalCourseDeleteConfirmationProps {
  isOpen: boolean
  cancelRef: React.RefObject<HTMLButtonElement>
  onClose: () => void
  handleConfirmDeleteCourse: () => void
}

export function ModalCourseDeleteConfirmation({isOpen, cancelRef, onClose, handleConfirmDeleteCourse}: ModalCourseDeleteConfirmationProps) {
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir curso
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja realmente excluir esse curso?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => handleConfirmDeleteCourse()} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}