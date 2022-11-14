import { None, Option, Some } from '@hqoss/monads';
import { onTabChange } from '../Home/Home';
import create from 'zustand';
import createContext from 'zustand/context';
import { useEffect } from 'react';
import { getTags } from '../../../services/conduit';

type Tags = string[];
type PopulateTags = (tags: Tags) => void;
type TagsSlice = { tags: Option<Tags>; populate: PopulateTags };

const createStore = () =>
  create<TagsSlice>((set) => ({
    tags: None,
    populate: (tags) => set(() => ({ tags: Some(tags) })),
  }));

const { Provider, useStore } = createContext<ReturnType<typeof createStore>>();

function TagsProvider({ children }: { children: React.ReactNode }) {
  return <Provider createStore={createStore}>{children}</Provider>;
}

async function getTagsAndPopulate(populate: PopulateTags) {
  const { tags } = await getTags();

  populate(tags);
}

function HomeSidebar() {
  const { tags, populate } = useStore();

  useEffect(() => {
    getTagsAndPopulate(populate);
  }, []);

  return (
    <div className='sidebar'>
      <p>Popular Tags</p>

      {tags.match({
        none: () => <span>Loading tags...</span>,
        some: (tags) => (
          <div className='tag-list'>
            {' '}
            {tags.map((tag) => (
              <a key={tag} href='#' className='tag-pill tag-default' onClick={() => onTabChange(`# ${tag}`)}>
                {tag}
              </a>
            ))}{' '}
          </div>
        ),
      })}
    </div>
  );
}

export default function HomeSidebarContainer() {
  return (
    <TagsProvider>
      <HomeSidebar />
    </TagsProvider>
  );
}
