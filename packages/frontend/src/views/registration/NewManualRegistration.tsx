import { WithContextApp } from "../lists/apps/WithContextApp";

export const NewManualRegistration = () => {
  return (
    <WithContextApp>
      {(app) => (
        <div>
          <div className="mockup-code">
            <pre data-prefix="$">
              <code>{JSON.stringify(app, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}
    </WithContextApp>
  );
};
