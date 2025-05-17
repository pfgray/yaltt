import { Pre } from "../../lib/ui/Pre";
import { WithContextApp } from "../lists/apps/WithContextApp";

export const NewManualRegistration = () => {
  return (
    <WithContextApp>
      {(app) => (
        <div>
          <div className="mockup-code">
            <Pre data-prefix="$">
              <code>{JSON.stringify(app, null, 2)}</code>
            </Pre>
          </div>
        </div>
      )}
    </WithContextApp>
  );
};
