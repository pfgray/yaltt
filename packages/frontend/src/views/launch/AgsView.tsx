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
import { Launch } from "./Launch";
import { LaunchCollapsible } from "./LaunchCollapsible";
import { fetchBodyFromEndpoint } from "../../lib/endpoint-ts/fetchFromEndpoint";
import { AppId, RegistrationId, createScoreForUser } from "@yaltt/model";
import * as F from "../../lib/forms/form";
import { provideRequestService } from "../../lib/api/requestServiceImpl";
import { renderManagedForm } from "../../lib/forms/renderManagedForm";
import React from "react";

type AgsViewProps = {
  launch: Launch;
};

const sendScore = fetchBodyFromEndpoint(createScoreForUser);

export const AgsView = ({ launch }: AgsViewProps) =>
  pipe(
    extractAgsEndpointClaim(launch.id_token),
    Option.bindTo("ags"),
    Option.bind("deploymentId", () =>
      extractDeploymentIdClaim(launch.id_token)
    ),
    Option.bind("user", () => extractUserIdentityClaim(launch.id_token)),
    Option.bind("userId", ({ user }) => Option.fromNullable(user.sub)),
    Option.map(({ ags, deploymentId, userId }) => (
      <LaunchCollapsible title="Assignment & Grade Services" initialOpen={true}>
        <div>lineitem</div>
        <pre>{ags.lineitem}</pre>
        <div>lineitems</div>
        <pre>{ags.lineitems}</pre>
        {ags.lineitem ? (
          <ScoreForm
            lineItemUrl={ags.lineitem}
            registrationId={launch.registration.id}
            appId={launch.app.id}
            userId={userId}
          />
        ) : null}
      </LaunchCollapsible>
    )),
    Option.getOrNull
  );

export const agsForm = (
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
  })((fields) =>
    pipe(
      sendScore(
        {
          appId,
          registrationId,
        },
        {
          lineItemUrl,
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
    )
  );

type AgsFormProps = {
  appId: AppId;
  lineItemUrl: string;
  userId: UserId;
  registrationId: RegistrationId;
};

const ScoreForm = (props: AgsFormProps) => {
  const entityForm = React.useMemo(
    () =>
      agsForm(
        props.appId,
        props.registrationId,
        props.lineItemUrl,
        props.userId
      ),
    [props.appId, props.registrationId, props.lineItemUrl]
  );
  return (
    <div>
      {renderManagedForm(entityForm, () => (
        <div className="modal-action">
          <button className="btn">Create</button>
        </div>
      ))}
    </div>
  );
};
