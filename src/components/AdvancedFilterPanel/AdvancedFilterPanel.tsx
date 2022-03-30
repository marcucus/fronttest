import dayjs from "dayjs";
import { ButtonPrimary, ButtonSecondary } from "../UI/Button";
import {
  connector,
  ContainerProps,
} from "./containers/AdvancedFilterPanel.containers";

type Props = {
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
  sort: "desc" | "asc";
  onChangeSort: (value: "desc" | "asc") => void;
  from: Date | null;
  onChangeFrom: (value: Date | null) => void;
  to: Date | null;
  onChangeTo: (value: Date | null) => void;
};

const Wrapper: React.FC<Props> = (props) => (
  <div className="mt-2 overflow-hidden bg-white rounded-md">
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Filtres et affichage avancés
      </h3>
      <p className="max-w-2xl mt-1 text-gray-900">
        Vous pouvez filtrer et rechercher des pages de manière plus précise. Les
        résultats de la recherche seront mis à jour une fois que vous aurez
        appuyer sur <strong>enregistrer et filter</strong>.
      </p>
    </div>
    <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
      <dl className="divide-y divide-gray-100">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="font-medium text-gray-900 ">Date de mise à jour</dt>
          <dd className="grid grid-cols-2 mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
            <div className="pr-2">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                De
              </label>
              <input
                type="date"
                className="w-full text-base border-gray-300 rounded-md"
                id="from"
                name="from"
                min="2021-01-01"
                onChange={(e) => props.onChangeFrom(e.target.valueAsDate)}
                value={dayjs(props.from).format("YYYY-MM-DD") || undefined}
                max={"2022-01-01"}
              />
            </div>
            <div className="pl-2">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700"
              >
                À
              </label>
              <input
                type="date"
                className="w-full text-base border-gray-300 rounded-md"
                id="to"
                name="to"
                min="2021-01-01"
                onChange={(e) => {
                  props.onChangeTo(e.target.valueAsDate);
                }}
                value={dayjs(props.to).format("YYYY-MM-DD") || undefined}
                max={"2022-01-01"}
              />
            </div>
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="font-medium text-gray-900 ">Ordre d'affichage</dt>
          <dd className="col-span-2 mt-1 text-gray-900">
            <select
              id="order"
              name="order"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
              value={props.sort}
              onChange={(e) =>
                props.onChangeSort(e.target.value as "desc" | "asc")
              }
            >
              <option value="desc">Du plus récent au plus ancien</option>
              <option value="asc">Du plus ancien au plus récent</option>
            </select>
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="font-medium text-gray-900">
            Enregistrement et actions
          </dt>
          <dd className="mt-1 space-x-2 text-gray-900 sm:mt-0 sm:col-span-2">
            <ButtonPrimary onClick={props.onSave}>
              Enregistrer et filtrer
            </ButtonPrimary>
            <ButtonSecondary onClick={props.onReset}>
              Réinitialiser
            </ButtonSecondary>
            <ButtonSecondary onClick={props.onClose}>Fermer</ButtonSecondary>
          </dd>
        </div>
      </dl>
    </div>
  </div>
);

export const Container: React.FC<ContainerProps> = (props) =>
  props.show ? <Wrapper {...props} /> : <></>;

export const AdvancedFilterPanel = connector(Container);
