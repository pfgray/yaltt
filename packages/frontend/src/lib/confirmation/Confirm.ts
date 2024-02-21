import { Context, Effect, pipe } from "effect";

export interface ConfirmationService {}

export const ConfirmationService = Context.Tag<ConfirmationService>();

/**
 * Opens up a confirmation dialog that succeeds if the user
 * clicks "confirm," otherwise fails.
 * @param options
 * @returns
 */
export const confirmWithLoading = <E>(options: {
  title: string;
  description: string;
  onSubmit: () => Effect.Effect<never, E, void>;
}) =>
  Effect.async<void, E, never>((resume) => {
    // confirm_modal_root
    const confirmModalRootEl = document.getElementById("confirmation_modal");
    const submitBtn = document.getElementById("confirmation_modal_confirm");
    const cancelBtn = document.getElementById("confirmation_modal_cancel");
    const title = document.getElementById("confirmation_modal_title");
    const description = document.getElementById(
      "confirmation_modal_description"
    );

    console.log("got here");
    if (
      confirmModalRootEl &&
      confirmModalRootEl instanceof HTMLDialogElement &&
      submitBtn &&
      submitBtn instanceof HTMLButtonElement &&
      cancelBtn &&
      cancelBtn instanceof HTMLButtonElement &&
      title &&
      description
    ) {
      console.log("doing the thing");
      title.innerHTML = options.title;
      description.innerHTML = options.description;
      console.log(
        "got confirm modal: ",
        confirmModalRootEl,
        submitBtn,
        cancelBtn
      );
      confirmModalRootEl.showModal();

      const cleanup = Effect.sync(() => {
        confirmModalRootEl.close();
        cancelBtn.removeEventListener("click", onCancel);
        submitBtn.removeEventListener("click", onSubmit);
      });

      const onSubmit = () => {
        resume(
          pipe(
            options.onSubmit(),
            Effect.onError(() => cleanup),
            Effect.tap(() => cleanup)
          )
        );
      };

      const onCancel = () => {
        resume(cleanup);
      };

      submitBtn.addEventListener("click", onSubmit);
      cancelBtn.addEventListener("click", onCancel);

      return Effect.sync(() => {
        cancelBtn.removeEventListener("click", onCancel);
        submitBtn.removeEventListener("click", onSubmit);
      });
    } else {
      return Effect.sync(() => {});
    }
  });
