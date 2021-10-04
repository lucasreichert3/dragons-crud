export function validateAllFields(formGroup: any) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);

    control.markAsDirty({ onlySelf: true });
  });
}
