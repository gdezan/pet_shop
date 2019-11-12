<RenderedLink
        key={page.name}
        onClick={() => setSideMenu(false)}
        to={page.path}
        first={index === 0 ? 1 : 0}
      >
        {page.name}
      </RenderedLink>