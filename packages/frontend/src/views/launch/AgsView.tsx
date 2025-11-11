import { Option, pipe } from "effect";
import {
  ActivityProgress,
  GradingProgress,
  LtiScope,
  UserId,
  extractAgsEndpointClaim,
  extractDeploymentIdClaim,
  extractUserIdentityClaim,
} from "lti-model";
import { Launch } from "@yaltt/model/src/registration/Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";
import { fetchBodyFromEndpoint } from "../../lib/endpoint-ts/fetchFromEndpoint";
import {
  AppId,
  RegistrationId,
  createLineItem,
  createScoreForUser,
} from "@yaltt/model";
import * as F from "../../lib/forms/form";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { renderManagedForm } from "../../lib/forms/renderManagedForm";
import React from "react";

type AgsViewProps = {
  launch: Launch;
};

const sendScore = fetchBodyFromEndpoint(createScoreForUser);
const sendLineItem = fetchBodyFromEndpoint(createLineItem);

export const AgsView = ({ launch }: AgsViewProps) =>
  pipe(
    extractAgsEndpointClaim(launch.id_token),
    Option.bindTo("ags"),
    Option.bind("deploymentId", () =>
      extractDeploymentIdClaim(launch.id_token)
    ),
    Option.bind("user", () => extractUserIdentityClaim(launch.id_token)),
    Option.bind("userId", ({ user }) => Option.fromNullable(user.sub)),
    Option.filter(
      ({ ags }) =>
        typeof ags.lineitem !== "undefined" ||
        typeof ags.lineitems !== "undefined"
    ),
    Option.map(({ ags, deploymentId, userId }) => (
      <LaunchCollapsible title="Assignment & Grade Services" initialOpen={true}>
        {ags.lineitem ? (
          <ScoreForm
            lineItemUrl={ags.lineitem}
            registrationId={launch.registration.id}
            appId={launch.app.id}
            userId={userId}
          />
        ) : null}
        {ags.lineitems ? (
          <LineItemForm
            appId={launch.app.id}
            lineItemsUrl={ags.lineitems}
            registrationId={launch.registration.id}
          />
        ) : null}
      </LaunchCollapsible>
    )),
    Option.getOrNull
  );

export const agsScoreForm = (
  appId: AppId,
  registrationId: RegistrationId,
  lineItemUrl: string,
  userId: UserId
) =>
  F.mkForm({
    activityProgress: F.select(
      "Activity Progress",
      Object.values(ActivityProgress),
      ActivityProgress.Completed
    ),
    gradingProgress: F.select(
      "Grading Progress",
      Object.values(GradingProgress),
      GradingProgress.FullyGraded
    ),
    scoreGiven: F.number("Score Given"),
    scoreMaximum: F.number("Score Maximum"),
    comment: F.textarea("Comment", ""),
    lineItemUrl: F.string("Line Item URL", lineItemUrl),
  })((fields) => {
    return pipe(
      sendScore(
        {
          appId,
          registrationId,
        },
        {
          lineItemUrl: fields.lineItemUrl,
        }
      )({
        timestamp: new Date(),
        activityProgress: fields.activityProgress,
        scoreGiven: Option.getOrUndefined(fields.scoreGiven),
        scoreMaximum: Option.getOrUndefined(fields.scoreMaximum),
        gradingProgress: fields.gradingProgress,
        userId,
        comment: fields.comment,
      }),
      provideRequestService
    );
  });

type AgsScoreFormProps = {
  appId: AppId;
  lineItemUrl: string;
  userId: UserId;
  registrationId: RegistrationId;
};

const ScoreForm = (props: AgsScoreFormProps) => {
  const entityForm = React.useMemo(
    () =>
      agsScoreForm(
        props.appId,
        props.registrationId,
        props.lineItemUrl,
        props.userId
      ),
    [props.appId, props.registrationId, props.lineItemUrl, props.userId]
  );
  return (
    <div>
      <h2 className="text-xl mt-3 mb-2">Score</h2>
      {renderManagedForm(entityForm, ({ submitForm }) => (
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Send Score
          </button>
        </div>
      ))}
    </div>
  );
};

export const agsLineItemForm = (
  appId: AppId,
  registrationId: RegistrationId,
  lineItemsUrl: string
) =>
  F.mkForm({
    label: F.string("Label", ""),
    scoreMaximum: F.number("Score Maximum", "100"),
    resourceId: F.string("Resource Id"),
    resourceLinkId: F.string("Resource Link Id"),
  })((fields) => {
    return pipe(
      sendLineItem(
        {
          appId,
          registrationId,
        },
        {
          lineItemsUrl,
        }
      )({
        label: fields.label,
        scoreMaximum: pipe(
          fields.scoreMaximum,
          Option.getOrElse(() => 100)
        ),
        resourceId: fields.resourceId,
        resourceLinkId: fields.resourceLinkId,
      }),
      provideRequestService
    );
  });

type AgsLineItemFormProps = {
  appId: AppId;
  lineItemsUrl: string;
  registrationId: RegistrationId;
};

export const LineItemForm = (props: AgsLineItemFormProps) => {
  const entityForm = React.useMemo(
    () =>
      agsLineItemForm(props.appId, props.registrationId, props.lineItemsUrl),
    [props.appId, props.registrationId, props.lineItemsUrl]
  );
  return (
    <div>
      <h2 className="text-xl mt-3 mb-2">Line Item</h2>
      {renderManagedForm(entityForm, ({ submitForm }) => (
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Send Line Item
          </button>
        </div>
      ))}
    </div>
  );
};
