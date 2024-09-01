// /:username/lists
// lists/delete
// /lists/create
// /lists/:list_id/update (only if a list has a single user)

// /lists/:list_id/add
// /lists/:list_id/remove (both add and remove will be used when list has mutiple users)

interface MediaList {
  id: string;
  uid: string;
  name: string;
  description: string;
  icon: { type: 'internal' | 'external'; path: string };
  membersIds: string[];
  creationDate: string;
  items: MediaListItem[]
}

interface MediaListItemUpdateOperation {
  uid: string;
  listId: string;
  operation: 'add' | 'remove';
  newItemData?: MediaListItem;
  membersIds: string[];
}

interface MediaListItem {
  title: string;
  itemType: 'movie' | 'tv';
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  posterPrimaryColor: string;
  voteAverage: number;
}

type MediaListUpdateOperationsBatch = MediaListItemUpdateOperation[];
