import {
  EntityIdT,
  IMultiFieldAttributes,
} from 'react-application-core';

export function toActualSnapshot(multiFieldAttributes: IMultiFieldAttributes): EntityIdT[] {
  if (multiFieldAttributes) {
    return multiFieldAttributes.add.concat(
        (multiFieldAttributes.source || [])
            .filter((entity) => !multiFieldAttributes.remove.find((removeId) => removeId === entity.id))
            .map((entity) => entity.id)
    );
  }
  return null;
}
