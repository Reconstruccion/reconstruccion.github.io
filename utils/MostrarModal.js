const mostrarModal = (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: 'Ok'
  });
}