import { None, Option, Some } from '@hqoss/monads';
import { onTabChange } from '../Home/Home';
import create from 'zustand';
import createContext from 'zustand/context';

type Tags = string[];
type TagsSlice = { tags: Option<Tags>; populate: (tags: Tags) => void };

const createStore = () =>
  create<TagsSlice>((set) => ({
    tags: None,
    populate: (tags) => set(() => ({ tags: Some(tags) })),
  }));

const { Provider, useStore } = createContext<ReturnType<typeof createStore>>();

function TagsProvider({ children }: { children: React.ReactNode }) {
  return <Provider createStore={createStore}>{children}</Provider>;
}

function HomeSidebar() {
  const { tags } = useStore();
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
