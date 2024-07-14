import { FormProvider } from 'react-hook-form';

// ----------------------------------------------------------------------
/**
 * react hook form 사용을 위한 provider
 *
 * @param children
 * @param form
 * @param onSubmit
 * @param disabledEnterKeyDown
 */
const RhfFormProvider = ({
  children,
  form,
  onSubmit,
  disabledEnterKeyDown = true,
}) => {
  const handleKeyDown = (event) => {
    if (disabledEnterKeyDown) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }
  };

  // ----------------------------------------------------------------------

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} onKeyDown={handleKeyDown}>
        {children}
      </form>
    </FormProvider>
  );
};

export default RhfFormProvider;
