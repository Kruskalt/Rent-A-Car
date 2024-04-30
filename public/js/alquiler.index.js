/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
document.querySelectorAll('.action-delete').forEach(($deleteAction) => {
    $deleteAction.addEventListener('click', (e) => {
      const { id} = $deleteAction.dataset;
      if (
        !confirm(
          `Confirma que desea eliminar el alquiler(ID: ${id})? Esta operación no se puede deshacer`
        )
      ) {
        e.preventDefault();
        return false;
      }
  
      return true;
    });
  });