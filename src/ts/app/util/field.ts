import {
  EntityIdT,
  IMultiFieldAttributes,
} from 'react-application-core';

export function toActualSnapshot(multiFieldAttributes: IMultiFieldAttributes): EntityIdT[] {
  if (multiFieldAttributes) {
    return multiFieldAttributes.add
      .map((entity) => entity.id)
      .concat(
        (multiFieldAttributes.source || [])
          .filter((entity) => !multiFieldAttributes.remove.find((removeId) => removeId.id === entity.id))
          .map((entity) => entity.id)
      );
  }
  return null;
}
