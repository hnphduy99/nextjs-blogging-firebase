import PostCategory from './post-category';
import PostImage from './post-image';
import PostMeta from './post-meta';
import PostTitle from './post-title';

export default function PostFeatureItem() {
  return (
    <div className='post-feature-item relative h-[170px] w-full rounded-2xl lg:h-[270px]'>
      <PostImage
        src='https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80'
        className='h-full w-full rounded-2xl'
        alt='unsplash'
      />
      <div className='post-overlay absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.75)] opacity-60 mix-blend-multiply' />
      <div className='post-content absolute inset-0 z-10 p-5 text-white max-lg:p-[15px]'>
        <div className='post-top mb-4 flex items-center justify-between'>
          <PostCategory>Kiến thức</PostCategory>
          <PostMeta date='01/01/2025' author='Admin' />
        </div>
        <PostTitle className='text-[22px] max-lg:text-base'>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
      </div>
    </div>
  );
}
